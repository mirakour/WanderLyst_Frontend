import { useState } from "react";

export default function TripForm ({ token }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/trip`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    start_date: startDate,
                    end_date: endDate,
                }),
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        {!token ?
            <button>Login to Plan a Trip</button>
        :
            <div className="tripForm">
                <form onSubmit={handleSubmit}>

                    <label for="title" className="formLabel">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />

                    <label for="startDate" className="formLabel">Start Date: </label>

                    <input
                        type="date"
                        id="startDate"
                        name="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <br />

                    <label for="endDate" className="formLabel">End Date: </label>

                    <input
                        type="date"
                        id="endDate"
                        name="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <br />

                    <label for="description" className="formLabel">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        rows="4"
                        cols="25"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />

                    <button>Submit</button>
                </form>
            </div>
        }
        </>
    );
}
