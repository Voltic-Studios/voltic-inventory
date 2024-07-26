class Item {
    constructor(name, count, label, weight, usable, rare, canRemove) {
        this.name = name;
        this.count = count;
        this.label = label;
        this.weight = weight;
        this.usable = usable;
        this.rare = rare;
        this.canRemove = canRemove;
    }
}

const app = new Vue({
    el: '#app',
    data: {
        inventory: {
            open: false,
            data: {
                weight: {
                    current: 1.5,
                    max: 15
                },
                categories: [
                    'all',
                    'other',
                    'weapons',
                    'consumables'
                ],
                items: [ new Item('hamburger', 1, 'Hambroguesa', 0.2, true, false, true) ]
            }
        }
    },
    methods: {
        post: function(url, data, callback) {
            $.post(`https://${GetParentResourceName()}/${url}`, JSON.stringify(data) || JSON.stringify({}), cb || function () { });
        },

        handleMessage(event) {
            const { action, data } = event.data;

            switch (action) {
                case 'open': {
                    this.inventory.open = true;

                    this.data.inventory.data.weight.current = data.weight;
                    this.data.inventory.data.weight.max = data.maxWeight;

                    for (let i = 0; i < data.items.length; i++) {
                        const item = data.items[i];
                        this.data.inventory.data.items.push(new Item(item.name, item.count, item.label, item.weight, item.usable, item.rare, item.canRemove));
                    }
                    break;
                }
            }
        }
    }
})