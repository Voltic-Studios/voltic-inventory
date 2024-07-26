local ESX = exports['es_extended']:getSharedObject()

local data = {
    inventory = {
        open = false,
        items = {}
    },
    money = 0,
    accounts = {},
    weapons = {},
    weight = 0,
    maxWeight = 0
}

Citizen.CreateThread(function()
    while (true) do
        Citizen.Wait(0)
        if (IsControlJustPressed(0, 37)) then
            openInventory()
        end
    end
end)

function openInventory()
    ESX.TriggerServerCallback('voltic-inventory:retrievePlayerData', function(cb)
        data = cb
    end, GetPlayerServerId(PlayerId()))

    SendNUIMessage({
        action = 'open',
        data = data
    })
end
