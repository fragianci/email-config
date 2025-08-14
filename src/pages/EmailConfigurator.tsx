import React, { useState } from "react";
import pkg from "../../package.json";

function EmailConfigurator() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [formDataBeforeEditing, setformDataBeforeEditing] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const cancelEdit = () => {
    setFormData(formDataBeforeEditing);
    toggleEdit();
  };

  const readFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const objectCopied = JSON.parse(text);
      setFormData(objectCopied);
    } catch (err) {
      console.error("Errore nella lettura dalla clipboard:", err);
      alert(
        "Non riesco a leggere gli appunti. Assicurati di aver dato i permessi o di aver copiato correttamente i dati."
      );
    }
  };

  const createJson = () => {
    const jsonString = JSON.stringify(formData);
    navigator.clipboard.writeText(jsonString);
    // .then(() => {
    //   alert("JSON copiato negli appunti!");
    // })
    // .catch((err) => {
    //   console.error("Errore nella copia:", err);
    // });
  };

  const setEmailToSend = () => {
    const mailtoLink = `mailto:${formData.to}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(formData.body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="w-xl mx-5 mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4 h-min">
      <h2 className="text-2xl font-bold mb-4">
        Invia Email <p className="text-sm">{pkg.version}</p>
      </h2>

      <div className="space-y-4">
        {/* CAMPI EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destinatario
          </label>
          <input
            type="email"
            name="to"
            value={formData.to}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 disabled:bg-gray-100 ${
              !isEditing ? "opacity-50" : ""
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Oggetto
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 disabled:bg-gray-100 ${
              !isEditing ? "opacity-50" : ""
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Testo
          </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            disabled={!isEditing}
            rows={5}
            className={`w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 disabled:bg-gray-100 ${
              !isEditing ? "opacity-50" : ""
            }`}
          ></textarea>
        </div>
      </div>

      {/* BOTTONI */}
      <div className="row space-x-2 mt-4">
        {isEditing ? (
          <>
            <div className="w-full flex justify-end gap-5">
              <button
                onClick={cancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Annulla
              </button>
              <button
                onClick={toggleEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Salva
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 sm:gap-5">
            <div className="w-full flex justify-end">
              <button
                onClick={setEmailToSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition  w-full sm:w-auto"
              >
                Prepara
              </button>
            </div>
            <div className="w-full flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-5">
              <button
                onClick={() => {
                  setformDataBeforeEditing(formData);
                  toggleEdit();
                }}
                className="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-yellow-600 transition w-full sm:w-auto"
              >
                Modifica
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-yellow-600 transition w-full sm:w-auto"
                onClick={readFromClipboard}
              >
                Importa dalla clipboard
              </button>

              <button
                onClick={createJson}
                className="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-yellow-600 transition w-full sm:w-auto"
              >
                Crea il JSON
              </button>
              <button
                onClick={() => setFormData({ to: "", subject: "", body: "" })}
                className="bg-red-500 text-white px-4 py-3 rounded-md hover:bg-yellow-600 transition w-full sm:w-auto"
              >
                Pulisci Tutto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailConfigurator;
