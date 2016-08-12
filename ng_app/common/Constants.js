var constants = angular.module("chin2km")
.constant('chin2kmThemes', {
    activeTheme: localStorage.getItem("chin2km_theme") || 'Black',
    allThemes: {
        'Red': { bg: 'red-bg', font: 'red-font' },
        'Orange': { bg: 'orange-bg', font: 'orange-font' },
        'Yellow': { bg: 'yellow-bg', font: 'yellow-font' },

        'Pink': { bg: 'pink-bg', font: 'pink-font' },
        'Black': { bg: 'black-bg', font: 'black-font' },
        'Green': { bg: 'green-bg', font: 'green-font' },

        'Purple': { bg: 'purple-bg', font: 'purple-font' },
        'Blue': { bg: 'blue-bg', font: 'blue-font' },
        'Teal': { bg: 'teal-bg', font: 'teal-font' },

    }
});