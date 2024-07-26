local ESX = exports['es_extended']:getSharedObject()

ESX.RegisterServerCallback('voltic-inventory:retrievePlayerData', function(source, cb, target)
    local targetPlayer = ESX.GetPlayerFromId(target)

    if (targetPlayer) then
        cb({
            inventory = {
                open = false,
                items = targetPlayer.getInventory()
            },
            money = targetPlayer.getMoney(),
            accounts = targetPlayer.getAccounts(),
            weapons = targetPlayer.getLoadout(),
            weight = targetPlayer.getWeight(),
            maxWeight = targetPlayer.getMaxWeight()
        })
    else
        cb(nil)
    end
end)
