import { useEffect, useState } from "react";
import Button from "./Button";
import { reservationService } from "../services/reservationService";
import { authService } from "../services/authService";

const generateDays = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    days.push({
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      date,
    });
  }
  return days;
};
const startHour = 10;
const endHour = 22;
const hours = Array.from(
  { length: endHour - startHour },
  (_, i) => startHour + i,
);

export const Schedule = ({ id, price }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const days = generateDays();
  const now = new Date();

  const isSelected = (date, hour) =>
    selectedSlots.some(
      (slot) =>
        slot.hour === hour && slot.date.toDateString() === date.toDateString(),
    );

  const isBooked = (date, hour) =>
    bookedSlots.some(
      (slot) =>
        slot.hour === hour && slot.date.toDateString() === date.toDateString(),
    );

  const toggleSlot = (date, hour) => {
    const slotTime = new Date(date);
    slotTime.setHours(hour, 0, 0, 0);
    if (slotTime < now) return;

    setSelectedSlots((prev) => {
      const exists = prev.some(
        (slot) =>
          slot.hour === hour &&
          slot.date.toDateString() === date.toDateString(),
      );

      if (exists) {
        return prev.filter(
          (slot) =>
            !(
              slot.hour === hour &&
              slot.date.toDateString() === date.toDateString()
            ),
        );
      }

      return [...prev, { date, hour }];
    });
  };

  const isPast = (date, hour) => {
    const slotTime = new Date(date);
    slotTime.setHours(hour, 0, 0, 0);
    return slotTime < now;
  };

  const handleSubmit = async () => {
    const baseDate = selectedSlots[0].date;
    const endDate = selectedSlots[selectedSlots.length - 1].date;
    const startHour = selectedSlots[0].hour;
    const endHour = selectedSlots[selectedSlots.length - 1].hour;

    const startTime = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      startHour,
      0,
      0,
    );
    const endTime = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      endHour,
      0,
      0,
    );

    try {
      console.log(
        authService.getCurrentUser().id,
        id,
        Number(price) * selectedSlots.length,
        startTime,
        endTime,
      );
      await reservationService.postReservation(
        authService.getCurrentUser().id,
        Number(id),
        Number(price) * selectedSlots.length,
        startTime,
        endTime,
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchBooked = async () => {
      try {
        const res = await reservationService.getReservations(Number(id));
        const slots = [];

        res.forEach((booking) => {
          const start = new Date(booking.startTime);
          const end = new Date(booking.endTime);

          const startHour = start.getHours();
          let endHour = end.getHours();

          // If endHour === startHour (1-hour reservation), make sure at least 1 hour is booked
          if (endHour === startHour) endHour = startHour + 1;

          for (let h = startHour; h <= endHour; h++) {
            slots.push({
              date: new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate(),
              ),
              hour: h,
            });
          }
        });

        console.log(slots);
        setBookedSlots(slots);
      } catch (err) {
        console.error(err);
      } finally {
        console.log(bookedSlots);
      }
    };
    fetchBooked();
  }, []);

  return (
    <div class=" flex">
      <table>
        <thead>
          <tr>
            <th class="pr-3">Time</th>
            {days.map((day) => (
              <th
                key={day.date.toISOString()}
                class="p-1 w-28 text-center whitespace-nowrap"
              >
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td class="pr-3 text-center">{hour}</td>

              {days.map((day) => {
                const active = isSelected(day.date, hour);
                const past = isPast(day.date, hour);
                const booked = isBooked(day.date, hour);
                return (
                  <td class="p-1" key={`${day.date.toISOString()}-${hour}`}>
                    <button
                      className={`
                        w-full h-12 rounded-lg border shadow-sm transition
                        active:scale-[0.98]
                        ${past || booked ? "bg-gray-700 cursor-not-allowed" : ""}
                        ${
                          past || booked
                            ? "bg-gray-700 cursor-not-allowed"
                            : active
                              ? "bg-blue-200 border-blue-400"
                              : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                        }
                      `}
                      disabled={past || booked}
                      onClick={() => toggleSlot(day.date, hour)}
                      title={`${day.label} ${hour}`}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div class="flex flex-col justify-top">
        <p class="py-1 font-bold w-[70%] text-center mx-auto">
          You chose to make a reservation for {selectedSlots.length}{" "}
          {selectedSlots.length === 1 ? "hour" : "hours"}
        </p>
        <p class="text-center">
          Price: {Number(price) <= 1 ? 0 : Number(price) * selectedSlots.length}
          PLN
        </p>
        <Button onClick={handleSubmit}>Book</Button>
      </div>
    </div>
  );
};
