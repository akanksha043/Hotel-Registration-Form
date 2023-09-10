const roomRates = {
    delux: 2500,
    suite: 4000,
    ac: 1000,
    locker: 300,
};

const form = document.getElementById("booking-form");
form.addEventListener("input", calculateTotal);

function calculateTotal() {
    const roomType = document.getElementById("room-type").value;

    // Get the selected amenities
    const selectedAmenities = Array.from(document.querySelectorAll("input[name='amenities']:checked")).map((input) => input.value);

    const totalDays = parseInt(document.getElementById("total-days").value);
    const totalPersons = parseInt(document.getElementById("total-persons").value);
    const advanceAmount = parseInt(document.getElementById("advance-amount").value);

    const totalRoomCost = roomRates[roomType] * totalDays;

    // Calculate the total amenities cost based on selected amenities
    const totalAmenitiesCost =selectedAmenities.reduce((total, amenity) => total + roomRates[amenity],0) * totalDays;

    const totalCost = totalRoomCost + totalAmenitiesCost;

    const extraPersonCost = totalPersons > 2 ? (totalPersons - 2) * 1000 : 0;
    const balanceAmount = totalCost - advanceAmount + extraPersonCost;

    // Store data in localStorage
    localStorage.setItem("roomType", roomType);
    localStorage.setItem("amenities", JSON.stringify(selectedAmenities));
    localStorage.setItem("totalDays", totalDays);
    localStorage.setItem("totalPersons", totalPersons);
    localStorage.setItem("advanceAmount", advanceAmount);

    // Update the displayed values
    document.getElementById("total-room-cost").textContent = totalRoomCost;
    document.getElementById("total-amenities-cost").textContent =totalAmenitiesCost;
    document.getElementById("total-cost").textContent = totalCost;
    document.getElementById("balance-amount").textContent = balanceAmount;
    document.getElementById("extra-person-cost").textContent = extraPersonCost;

}

// Load data from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const savedRoomType = localStorage.getItem("roomType");
    const savedAmenities = JSON.parse(localStorage.getItem("amenities"));
    const savedTotalDays = localStorage.getItem("totalDays");
    const savedTotalPersons = localStorage.getItem("totalPersons");
    const savedAdvanceAmount = localStorage.getItem("advanceAmount");

    if (
        savedRoomType &&
        savedAmenities &&
        savedTotalDays &&
        savedTotalPersons &&
        savedAdvanceAmount
    ) {
        document.getElementById("room-type").value = savedRoomType;
        savedAmenities.forEach((amenity) => {
            document.getElementById(amenity).checked = true;
        });
        document.getElementById("total-days").value = savedTotalDays;
        document.getElementById("total-persons").value = savedTotalPersons;
        document.getElementById("advance-amount").value = savedAdvanceAmount;

        calculateTotal(); // Update the calculated values
    }
});