local Luxtl = loadstring(game:HttpGet("https://raw.githubusercontent.com/xHeptc/Luxware-UI-Library/main/Source.lua"))()

local Luxt = Luxtl.CreateWindow("Dead Rails")

local mainTab = Luxt:Tab("Main")
local ff1 = mainTab:Section("Things")
ff1:Button("Bond Farm Execute In Game", function()
if game.PlaceID == 70876832253163 then
    loadstring(game:HttpGet("https://raw.githubusercontent.com/thiennrb7/Script/refs/heads/main/autobond"))()
end
end)

local miscTab = Luxt:Tab("Misc")
local ff2 = miscTab:Section("Classes")
ff2:Button("Horse Class", function()
    local args = {
    [1] = "Horse"
}

game:GetService("ReplicatedStorage"):WaitForChild("Shared"):WaitForChild("RemotePromise"):WaitForChild("Remotes"):WaitForChild("C_BuyClass"):FireServer(unpack(args))

end)



local creditsTab = Luxt:Tab("Credits")
local cf = creditsTab:Section("Main Credits")
cf:Credit("Hunter: All the main coding")
cf:Credit("Punchy For The Alt Control Script")
local cf1 = creditsTab:Section("UI Credits")
cf1:Credit("xHeptc: UI Library")
local cf2 = creditsTab:Section("Helping Credits")
cf2:Credit("Punchy: Helping debug and fix minor issues")
