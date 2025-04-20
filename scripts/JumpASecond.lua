--if game.PlaceID == 11063612131 then


local Luxtl = loadstring(game:HttpGet("https://raw.githubusercontent.com/xHeptc/Luxware-UI-Library/main/Source.lua"))()

local Luxt = Luxtl.CreateWindow("+1 jump script thing")

local mainTab = Luxt:Tab("Main")
local ff1 = mainTab:Section("Free Things")
ff1:Button("Free Spin", function()
    game:GetService("ReplicatedStorage"):WaitForChild("SpinFolder"):WaitForChild("Spin"):FireServer()
end)

ff1:DropDown("Amount free rewards kinda buggy", {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "All"}, function(num)
    local args = {
        [1] = "TimeGift",
        [2] = num == "All" and "12" or num
    }

    if num == "All" then
        for i = 1, 12 do
            local args = {
                [1] = "TimeGift",
                [2] = tostring(i)
            }
            game:GetService("ReplicatedStorage"):WaitForChild("Recv"):InvokeServer(unpack(args))
        end
    else
        game:GetService("ReplicatedStorage"):WaitForChild("Recv"):InvokeServer(unpack(args))
    end
end)

local localplayerTab = Luxt:Tab("LocalPlayer")
local ff2 = localplayerTab:Section("Sliders")

ff2:Slider("WalkSpeed", 16, 503, function(currentValue)
    game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = currentValue 
end)

ff2:Slider("JumpHeight buggy", 16, 99999999, function(currentValue)
    game.Players.LocalPlayer.Character.Humanoid.JumpHeight = currentValue 
end)





local creditsTab = Luxt:Tab("Credits")
local cf = creditsTab:Section("Main Credits")
cf:Credit("Hunter: All the main coding")
local cf1 = creditsTab:Section("UI Credits")
cf1:Credit("xHeptc: UI Library")
local cf2 = creditsTab:Section("Helping Credits")
cf2:Credit("Punchy: Helping debug and fix minor issues")
