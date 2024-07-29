local ESX = exports["es_extended"]:getSharedObject()

local data = {
	inventory = {
		open = false,
		items = {},
	},
	money = 0,
	accounts = {},
	weapons = {},
	weight = 0,
	maxWeight = 0,
}

--esx command
RegisterCommand("inventory", function()
	openInventory()
end, false)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		if IsControlJustPressed(0, 37) then
			openInventory()
		end
	end
end)

function openInventory()
	ESX.TriggerServerCallback("voltic-inventory:retrievePlayerData", function(cb)
		local items = cb.inventory.items
		local filteredItems = {}

		for _, item in ipairs(items) do
			if Config.ItemCategories.Consumables[item.name] then
				table.insert(filteredItems, {
					name = item.name,
					label = item.label,
					weight = item.weight,
					count = item.count,
					category = "consumables",
				})
			end
			if Config.ItemCategories.Drugs[item.name] then
				table.insert(filteredItems, {
					name = item.name,
					label = item.label,
					weight = item.weight,
					count = item.count,
					category = "drugs",
				})
			end
			if Config.ItemCategories.Weapons[item.name] then
				table.insert(filteredItems, {
					name = item.name,
					label = item.label,
					weight = item.weight,
					count = item.count,
					category = "weapons",
				})
			end
			if
				not Config.ItemCategories.Consumables[item.name]
				and not Config.ItemCategories.Drugs[item.name]
				and not Config.ItemCategories.Weapons[item.name]
			then
				table.insert(filteredItems, {
					name = item.name,
					label = item.label,
					weight = item.weight,
					count = item.count,
					category = "other",
				})
			end
		end

		SendNUIMessage({
			action = "open",
			data = {
				inventory = {
					open = true,
					items = filteredItems,
				},
				money = cb.money,
				accounts = cb.accounts,
				weapons = cb.weapons,
				weight = cb.weight,
				maxWeight = cb.maxWeight,
			},
		})

		SetNuiFocus(true, true)
		SetNuiFocusKeepInput(true)
	end, GetPlayerServerId(PlayerId()))
end
