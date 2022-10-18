const newFormHandler = async (event) => {
  event.preventDefault();

  const car = document.querySelector("#bookedcar").value.trim();
  const pickUp = document.querySelector("#datepicker").value.trim();
  const dropOff = document.querySelector("#datepicker1").value.trim();

  if (car && pickUp && dropOff) {
    const response = await fetch(`/api/bookings`, {
      method: "POST",
      body: JSON.stringify({ car, pickUp, dropOff }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create booking");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete booking");
    }
  }
};

document
  .querySelector(".new-booking-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".booking-list")
  .addEventListener("click", delButtonHandler);
