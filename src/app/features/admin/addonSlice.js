import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addOns: null,
    selectedItems: {
        restaurants: {},
        homelyFoods: {},
        otherServices: {},
        roomServices: {},
        rides: {},
        entertainments: {},
    },
}


const addOnSlice = createSlice({
    name: 'addOns',
    initialState,
    reducers: {
        setAddOns: (state, { payload }) => {
            const hasSelectedItems = Object.values(state.selectedItems).some(section =>
                Object.keys(section).length > 0
            );

            state.addOns = payload;

            if (hasSelectedItems) {
                Object.entries(state.selectedItems).forEach(([section, items]) => {
                    // Map the section names to match addOns keys
                    const addOnsSectionKey = {
                        otherServices: "otherservice",
                        roomServices: "roomservice",
                        homelyFoods: "homelyfoods",
                    }[section] || section;

                    if (Object.keys(items).length > 0 && payload[addOnsSectionKey]) {
                        Object.entries(items).forEach(([itemId, selectedItem]) => {
                            // Find matching venue or item in the new addOns data
                            const matchingVenue = payload[addOnsSectionKey].find(venue =>
                                venue.menuItems?.some(item => item._id === itemId) || // For restaurants & homelyFoods
                                venue._id === itemId // For other services, room services, rides, entertainments
                            );

                            if (matchingVenue) {
                                if (matchingVenue.menuItems) {
                                    // Update price for menu items (restaurants & homelyFoods)
                                    const menuItem = matchingVenue.menuItems.find(item =>
                                        item._id === itemId
                                    );
                                    if (menuItem) {
                                        state.selectedItems[section][itemId] = {
                                            ...selectedItem,
                                            price: menuItem.price // Updated price from new addOns
                                        };
                                    }
                                } else if (matchingVenue.amount !== undefined) {
                                    // Update price for otherServices, roomServices, rides, entertainments
                                    state.selectedItems[section][itemId] = {
                                        ...selectedItem,
                                        price: matchingVenue.amount // Updated price from new addOns
                                    };
                                }
                            }
                        });
                    }
                });
            }
        },
        clearAddOns: (state) => {
            state.addOns = null
        },
        toggleMenuItem: (state, action) => {
            const { section, id, item } = action.payload;
            const updatedSection = { ...state.selectedItems[section] };

            if (updatedSection[id]) {
                delete updatedSection[id];
            } else {
                updatedSection[id] = { ...item, quantity: 1 };
            }

            state.selectedItems[section] = updatedSection;
        },
        updateQuantity: (state, action) => {
            const { section, id, quantity } = action.payload;

            if (state.selectedItems[section][id]) {
                state.selectedItems[section][id].quantity = quantity;
            }
        },
        setSelectedItems: (state, { payload }) => {
            state.selectedItems = payload
        },
    }
})



export default addOnSlice.reducer
export const {
    setAddOns,
    clearAddOns,
    toggleMenuItem,
    updateQuantity
} = addOnSlice.actions;