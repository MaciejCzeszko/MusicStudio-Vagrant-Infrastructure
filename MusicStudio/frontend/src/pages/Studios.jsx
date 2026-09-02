import { useEffect, useState } from "react";
import { studiosService } from "../services/studiosService";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Studios = () => {
  const navigate = useNavigate();

  const [studios, setStudios] = useState([]);

  useEffect(() => {
    const fetchStudios = async () => {
      const res = await studiosService.getAllStudios();
      setStudios(res);
      console.log(res);
    };
    fetchStudios();
  }, []);

  const handleBook = (id) => {
    navigate(`/reservation/${id}`);
  };

  return (
    <main class="flex justify-center">
      <div class="bg-sky-800/85 w-[75%] flex flex-col items-center my-15 p-5 pb-15 rounded-md">
        <h2 class="font-bold text-3xl mb-10">Studios</h2>
        <ul>
          {studios.map((studio) => {
            return (
              <li
                key={studio.id}
                class="bg-neutral-primary border-b border-default flex flex-col"
              >
                <div class="flex w-full justify-around">
                  <p class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    {studio.name}
                  </p>
                  <p class="px-6 py-4">{studio.price}PLN/h</p>
                </div>
                <div class="flex">
                  <img
                    src={studio.imageUrl}
                    alt={studio.name}
                    class=" object-cover rounded px-6 py-4 w-xl"
                  />
                  <div>
                    <p>Gear:</p>
                    {studio.gear.map((item, index) => {
                      return <p key={index}>{item}</p>;
                    })}
                    <Button
                      onClick={() => handleBook(studio.id)}
                      style={"w-full"}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};
