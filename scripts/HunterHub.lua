-- I dont really care if you are reading this its just VERY messy in the actual scripts itself so im just warning you





























































if game.PlaceID == 70876832253163 or 116495829188952 then
    loadstring(game:HttpGet("https://th3hunt3y.github.io/scripts/deadrails.lua"))()
else
    if game.PlaceID == 11063612131 then
    loadstring(game:HttpGet("https://th3hunt3y.github.io/scripts/JumpASecond.lua"))()
else
        -- Function to kick the player
local function kickPlayer()
    -- Print the message to the output (you can modify this to display it in-game if needed)
    warn("Wrong game, join deadrails or +1 jump every second")
    
    -- Kick the player
    game.Players.LocalPlayer:Kick("Wrong game, join deadrails or +1 jump every second")
end

-- Call the function immediately
kickPlayer()
