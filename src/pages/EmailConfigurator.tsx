import React, { useState, useRef } from "react";
import pkg from "../../package.json";

function EmailConfigurator() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    to: "farmaciacontinuita.chivasso@aslto4.piemonte.it",
    subject: "Oggetto di esempio",
    body: `Buongiorno mi servirebbero queste compresse [PASTIGLIE], uso orale. In allegato c'è il piano terapeutico

Ne ho ancora per una decina di giorni ma vorrei portarmi avanti con la prenotazione.
Potrei ritirarli all'asl di [LUOGO] ? Grazie`,
  });

  const [imageSrc, setImageSrc] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageSrc("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openPreview = () => {
    if (imageSrc) {
      setShowPreview(true);
    }
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const setEmailToSend = () => {
    const mailtoLink = `mailto:${formData.to}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(formData.body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="max-w-xl mx-5 mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4">
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
      <div className="flex justify-end space-x-2 mt-4">
        {isEditing ? (
          <button
            onClick={toggleEdit}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Salva
          </button>
        ) : (
          <>
            <button
              onClick={toggleEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Modifica
            </button>
            <button
              onClick={setEmailToSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Prepara
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailConfigurator;
