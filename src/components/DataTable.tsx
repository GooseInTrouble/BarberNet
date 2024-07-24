"use client";

import { useState, useEffect } from "react";

export default function DataTable({
  caption,
  content,
  columnStyle,
}: {
  caption: string;
  content: string[][];
  columnStyle: string;
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setIsLoading(true);
    fetch(`/api/data/${caption}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (data.length === 0) return <p className="text-white">No data to show</p>;

  const className = "rounded-lg border border-black m-1 w-[25%] h-11";

  return (
    <div>
      <div className={`grid ${columnStyle}`}>
        {content.map(([key]) => (
          <div
            key={key}
            className="border border-black p-3 text-center bg-slate-600 text-white"
          >
            {formatString(key)}
          </div>
        ))}
      </div>
      {data.map((item, index) => (
        <form
          className={`grid ${columnStyle}`}
          key={index}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const formEntries = Object.fromEntries(formData);

            const id = item["_id"];

            const obj: any = {};
            content.forEach(([key, type, extra]) => {
              if (extra === "readonly") return;

              try {
                switch (type) {
                  case "object":
                    if (!formEntries[key]) break;
                    obj[key] = JSON.parse(formEntries[key].toString());
                    break;
                  default:
                    obj[key] = formEntries[key];
                    break;
                }
              } catch (err: any) {
                prompt(JSON.stringify(err), "Error");
                return;
              }
            });

            fetch(`/api/data/${caption}/${id}`, {
              method: "PUT",
              body: JSON.stringify(obj),
            }).then(() => {
              fetchData();
            });
          }}
        >
          {content.map(([key, type, extra]) => (
            <input
              className="border border-black bg-slate-500 p-3 text-white"
              key={key}
              name={key}
              placeholder={key}
              type={type}
              defaultValue={
                type === "object"
                  ? JSON.stringify(item[key])
                  : type === "date"
                  ? formatDate(new Date(item[key]))
                  : item[key]
              }
              required={extra === "required"}
              readOnly={extra === "readonly"}
            />
          ))}
          <div>
            <button type="submit" className={`bg-green-500 ${className}`}>
              Edit
            </button>
            <button type="reset" className={`bg-yellow-500 ${className}`}>
              Res
            </button>
            <button
              className={`bg-red-500 ${className}`}
              onClick={() => {
                fetch(`/api/data/${caption}/${(item as any)._id}`, {
                  method: "DELETE",
                }).then(() => {
                  fetchData();
                });
              }}
              type="button"
            >
              Del
            </button>
          </div>
        </form>
      ))}
      <form
        className={`grid ${columnStyle}`}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const formEntries = Object.fromEntries(formData);

          const obj: any = {};
          content.forEach(([key, type, extra]) => {
            if (extra === "readonly") return;

            try {
              switch (type) {
                case "object":
                  if (!formEntries[key]) break;
                  obj[key] = JSON.parse(formEntries[key].toString());
                  break;
                default:
                  obj[key] = formEntries[key];
                  break;
              }
            } catch (err: any) {
              prompt(JSON.stringify(err), "Error");
              return;
            }
          });

          fetch(`/api/data/${caption}`, {
            method: "POST",
            body: JSON.stringify(obj),
          }).then(() => {
            fetchData();
          });
        }}
      >
        {content.map(([key, type, extra]) =>
          extra === "readonly" ? (
            <div key={key}></div>
          ) : (
            <input
              className="border border-black p-2 bg-slate-500 text-white"
              key={key}
              name={key}
              placeholder={key}
              type={type}
              required={extra === "required"}
              readOnly={extra === "readonly"}
            />
          )
        )}
        <div>
          <input
            type="submit"
            value="Add"
            className={`bg-blue-500 ${className}`}
          />
        </div>
      </form>
    </div>
  );
}

function formatDate(date: Date): string {
  console.log(date);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

function formatString(input: string): string {
  const words = input.split(/(?=[A-Z])/);

  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedString;
}
