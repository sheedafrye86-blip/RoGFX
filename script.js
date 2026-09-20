function generateLuauScript() {
    const promptInput = document.getElementById('scriptPrompt').value.trim().toLowerCase();
    const output = document.getElementById('scriptOutput');

    let scriptContent = '';

    // Smart keyword detection based on what the user types!
    if (promptInput.includes('zombie') || promptInput.includes('kill') || promptInput.includes('leaderstat')) {
        scriptContent = `-- [AUTO-GENERATED: ZOMBIE / KILL SYSTEM]
-- Based on your prompt: "${promptInput}"

local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local KillsDataStore = DataStoreService:GetDataStore("CustomKillsStore_v1")

Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local kills = Instance.new("IntValue")
    kills.Name = "Kills"
    kills.Value = 0
    kills.Parent = leaderstats

    local success, err = pcall(function()
        kills.Value = KillsDataStore:GetAsync("User_" .. player.UserId) or 0
    end)
    if not success then warn("Data load error: " .. tostring(err)) end
end)

Players.PlayerRemoving:Connect(function(player)
    pcall(function()
        KillsDataStore:SetAsync("User_" .. player.UserId, player.leaderstats.Kills.Value)
    end)
end)`;

    } else if (promptInput.includes('mm2') || promptInput.includes('murder') || promptInput.includes('role') || promptInput.includes('sheriff')) {
        scriptContent = `-- [AUTO-GENERATED: ROLE SHUFFLER SYSTEM]
-- Based on your prompt: "${promptInput}"

local Players = game:GetService("Players")
local ROUND_TIME = 120

local function shuffleRoles()
    local playerList = Players:GetPlayers()
    if #playerList < 2 then print("Waiting for more players...") return end
    
    local traitorIndex = math.random(1, #playerList)
    local guardIndex
    repeat
        guardIndex = math.random(1, #playerList)
    until guardIndex ~= traitorIndex

    for i, player in ipairs(playerList) do
        local role = "Innocent"
        if i == traitorIndex then role = "Traitor"
        elseif i == guardIndex then role = "Guard" end
        
        print(player.Name .. " was assigned role: " .. role)
    end
end

task.spawn(function()
    while true do
        shuffleRoles()
        task.wait(ROUND_TIME)
    end
end)`;

    } else if (promptInput.includes('gui') || promptInput.includes('menu') || promptInput.includes('ui') || promptInput.includes('sidebar')) {
        scriptContent = `-- [AUTO-GENERATED: CUSTOM UI / SIDEBAR SYSTEM]
-- Based on your prompt: "${promptInput}"

local player = game.Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "CustomPromptGUI"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

local mainFrame = Instance.new("Frame")
mainFrame.Size = UDim2.new(0, 300, 0, 400)
mainFrame.Position = UDim2.new(0.5, -150, 0.5, -200)
mainFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 24)
mainFrame.BorderSizePixel = 0
mainFrame.Parent = screenGui

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 10)
corner.Parent = mainFrame

print("Custom GUI loaded successfully from prompt!")`;

    } else {
        // Universal fallback script for any custom text prompt the user types!
        scriptContent = `-- [AUTO-GENERATED LUAU SCRIPT]
-- User Prompt: "${promptInput}"

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

print("Initializing system for custom mechanic...")

-- Custom event tied to your prompt instructions
local customEvent = Instance.new("RemoteEvent")
customEvent.Name = "CustomPromptEvent"
customEvent.Parent = ReplicatedStorage

customEvent.OnServerEvent:Connect(function(player, ...)
    print("Received trigger from " .. player.Name)
    -- Your custom logic goes here based on: ${promptInput}
end)`;
    }

    output.textContent = scriptContent;
}
