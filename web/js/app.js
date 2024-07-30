const app = new Vue({
  el: "#app",
  data: {
    inventory: {
      open: true,
      data: {
        weight: {
          current: 1.5,
          max: 15,
        },
        currentCategory: "all",
        categories: ["all", "other", "weapons", "consumables"],
        items: [
          {
            name: "bread",
            label: "Pan",
            count: 1,
            weight: 1,
            category: "consumables",
          },
          {
            name: "weapon_appistol",
            label: "Pistola AP",
            count: 1,
            weight: 5,
            category: "weapons",
          },
        ],
      },
    },
  },
  methods: {
    post: function (url, data, callback) {
      $.post(
        `https://${GetParentResourceName()}/${url}`,
        JSON.stringify(data) || JSON.stringify({}),
        cb || function () {}
      );
    },

    openItemOptions: function (item) {
      let closed = $("#" + item);
      let opened = $("#item-options-" + item);

      if (closed.is(":visible")) {
        closed.hide();
        opened.show();
      } else {
        closed.show();
        opened.hide();
      }
    },

    handleMessage(event) {
      const { action, data } = event.data;

      switch (action) {
        case "open": {
          console.log("open inventory");
          this.inventory.open = true;

          this.inventory.data.weight.current = data.weight;
          this.inventory.data.weight.max = data.maxWeight;

          for (let i = 0; i < data.inventory.items.length; i++) {
            const inventoryItem = data.inventory.items[i];

            console.log(inventoryItem);

            this.inventory.data.items.push({
              name: inventoryItem.name,
              label: inventoryItem.label,
              count: inventoryItem.count,
              weight: inventoryItem.weight / 1000,
              category: inventoryItem.category,
            });
          }
          break;
        }
      }
    },
  },
  computed: {
    filteredItems() {
      console.log("Current Category:", this.inventory.data.currentCategory);
      console.log("Items:", this.inventory.data.items);

      if (this.inventory.data.currentCategory === "all") {
        return this.inventory.data.items;
      } else {
        const filtered = this.inventory.data.items.filter(
          (item) => item.category === this.inventory.data.currentCategory
        );
        console.log("Filtered Items:", filtered);
        return filtered;
      }
    },
  },
  mounted() {
    window.addEventListener("message", this.handleMessage);

    setTimeout(() => {
      document.dispatchEvent(
        new MessageEvent("message", {
          data: {
            action: "open",
            data: {
              inventory: {
                open: true,
                items: [
                  {
                    name: "bread",
                    label: "Pan",
                    count: 1,
                    weight: 1,
                    category: "consumables",
                  },
                  {
                    name: "weapon_appistol",
                    label: "Pistola AP",
                    count: 1,
                    weight: 5,
                    category: "weapons",
                  },
                ],
              },
            },
          },
        })
      );
    }, 1500);
  },
});
