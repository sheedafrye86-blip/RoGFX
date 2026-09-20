function switchTab(tabId) {
    document.querySelectorAll('.tab-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    
    if(tabId === 'thumbnail') {
        document.getElementById('thumbnail-tab').classList.add('active');
        event.currentTarget.classList.add('active');
        drawThumbnail();
    } else {
        document.getElementById('script-tab').classList.add('active');
        event.currentTarget.classList.add('active');
    }
}

// --- Canvas Thumbnail Renderer ---
window.onload = function() {
    drawThumbnail();
};

function drawThumbnail() {
    const canvas = document.getElementById('thumbnailCanvas');
    const ctx = canvas.getContext('2d');
    
    const topText = document.getElementById('thumbTopText').value;
    const stat1 = document.getElementById('thumbStat1').value;
    const stat2 = document.getElementById('thumbStat2').value;
    const avatarStyle = document.getElementById('thumbAvatarStyle').value;
    const bgTheme = document.getElementById('thumbBgTheme').value;

    // 1. Draw Background
    if(bgTheme === 'portal') {
        // Gradient sky
        let skyGrad = ctx.createLinearGradient(0, 0, 0, 720);
        skyGrad.addColorStop(0, '#10052b');
        skyGrad.addColorStop(1, '#3b145e');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, 1280, 720);

        // Glowing portal swirl
        let portalGrad = ctx.createRadialGradient(950, 360, 20, 950, 360, 300);
        portalGrad.addColorStop(0, '#ff00ea');
        portalGrad.addColorStop(0.5, '#7b00ff');
        portalGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = portalGrad;
        ctx.beginPath();
        ctx.arc(950, 360, 300, 0, Math.PI * 2);
        ctx.fill();
    } else {
        // Bright simulator sky & green grid
        let skyGrad = ctx.createLinearGradient(0, 0, 0, 720);
        skyGrad.addColorStop(0, '#4da6ff');
        skyGrad.addColorStop(1, '#b3d9ff');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, 1280, 720);
    }

    // Studded Green Baseplate
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(0, 500, 1280, 220);
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 4;
    for(let x = 0; x < 1280; x += 80) {
        for(let y = 520; y < 720; y += 80) {
            ctx.strokeRect(x, y, 60, 60);
        }
    }

    // Platform Pad
    ctx.fillStyle = bgTheme === 'portal' ? '#f1c40f' : '#e74c3c';
    ctx.fillRect(500, 560, 280, 40);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(500, 600, 280, 15);

    // 2. Draw Blocky Avatar (Bacon Hair)
    let avatarX = 640;
    let avatarY = 480;

    // Torso (Black jacket over blue shirt)
    ctx.fillStyle = '#222';
    ctx.fillRect(avatarX - 70, avatarY - 140, 140, 160);
    ctx.fillStyle = '#3498db';
    ctx.fillRect(avatarX - 40, avatarY - 120, 80, 120);

    // Head
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(avatarX - 55, avatarY - 260, 110, 110);

    // Face expression
    ctx.fillStyle = '#000';
    if(avatarStyle === 'sad') {
        // Sad eyes & frown
        ctx.fillRect(avatarX - 35, avatarY - 230, 16, 16);
        ctx.fillRect(avatarX + 19, avatarY - 230, 16, 16);
        ctx.beginPath();
        ctx.arc(avatarX, avatarY - 180, 15, Math.PI, 0, false);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#000';
        ctx.stroke();
    } else {
        // Shocked/OP eyes & mouth
        ctx.fillRect(avatarX - 35, avatarY - 235, 18, 22);
        ctx.fillRect(avatarX + 17, avatarY - 235, 18, 22);
        ctx.beginPath();
        ctx.arc(avatarX, avatarY - 180, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
    }

    // Bacon Hair
    ctx.fillStyle = '#a0522d';
    ctx.fillRect(avatarX - 65, avatarY - 290, 130, 40);
    ctx.fillRect(avatarX - 75, avatarY - 270, 25, 70);
    ctx.fillRect(avatarX + 50, avatarY - 270, 25, 70);

    // Arms
    ctx.fillStyle = '#fff';
    ctx.fillRect(avatarX - 120, avatarY - 140, 40, 130);
    ctx.fillRect(avatarX + 80, avatarY - 140, 40, 130);

    // 3. Draw Thick Stroked Text Overlays
    ctx.font = '700 64px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    
    // Top Multi-Color Text
    drawStrokedText(ctx, topText, 640, 100, '#00ffcc', '#000', 8);

    // Floating Stats
    ctx.font = '700 48px "Fredoka", sans-serif';
    drawStrokedText(ctx, stat1, 320, 320, '#ffffff', '#000', 6);
    drawStrokedText(ctx, stat2, 980, 420, '#ffcc00', '#000', 6);
}

function drawStrokedText(ctx, text, x, y, fillColor, strokeColor, lineWidth) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = fillColor;
    ctx.fillText(text, x, y);
}

function downloadThumbnail() {
    const canvas = document.getElementById('thumbnailCanvas');
    const link = document.createElement('a');
    link.download = 'roblox-thumbnail.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// --- Script Generator ---
function generateLuauScript() {
    const type = document.getElementById('scriptType').value;
    const prompt = document.getElementById('scriptPrompt').value;
    const output = document.getElementById('scriptOutput');

    let scriptContent = '';

    if(type === 'zombie') {
        scriptContent = `-- [ZOMBIE KILL-TRACKING LEADERBOARD SYSTEM]
-- Prompt customization: ${prompt || 'Standard setup'}

local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local ZombieDataStore = DataStoreService:GetDataStore("ZombieKillsStore_v1")

Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local kills = Instance.new("IntValue")
    kills.Name = "Kills"
    kills.Value = 0
    kills.Parent = leaderstats

    -- Load saved data
    local success, err = pcall(function()
        kills.Value = ZombieDataStore:GetAsync("User_" .. player.UserId) or 0
    end)
    if not success then warn("Failed to load data for " .. player.Name) end
end)

Players.PlayerRemoving:Connect(function(player)
    pcall(function()
        ZombieDataStore:SetAsync("User_" .. player.UserId, player.leaderstats.Kills.Value)
    end)
end)`;
    } else if(type === 'mm2') {
        scriptContent = `-- [MURDER MYSTERY 2 ROLE SHUFFLER]
-- Prompt customization: ${prompt || 'Standard 3-role round loop'}

local Players = game:GetService("Players")
local ROUND_TIME = 120

local function startRound()
    local playerList = Players:GetPlayers()
    if #playerList < 3 then return end
    
    -- Shuffle roles
    local murdererIndex = math.random(1, #playerList)
    local sheriffIndex
    repeat
        sheriffIndex = math.random(1, #playerList)
    until sheriffIndex ~= murdererIndex

    for i, player in ipairs(playerList) do
        local role = "Innocent"
        if i == murdererIndex then role = "Murderer"
        elseif i == sheriffIndex then role = "Sheriff" end
        
        print(player.Name .. " assigned role: " .. role)
        -- Fire client remotes to display UI role banner here
    end
end

task.spawn(function()
    while true do
        startRound()
        task.wait(ROUND_TIME)
    end
end)`;
    } else {
        scriptContent = `-- [SIMULATOR CLICKER & MULTIPLIER SYSTEM]
-- Prompt customization: ${prompt || 'Standard clicker loop'}

local Players = game:GetService("Players")

local function onPlayerAdded(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local clicks = Instance.new("IntValue")
    clicks.Name = "Clicks"
    clicks.Value = 0
    clicks.Parent = leaderstats
end

Players.PlayerAdded:Connect(onPlayerAdded)`;
    }

    output.textContent = scriptContent;
}

function copyScript() {
    const code = document.getElementById('scriptOutput').textContent;
    navigator.clipboard.writeText(code);
    alert('Luau script copied to clipboard!');
}
