import React, { useState, useRef } from "react";

function EmailConfigurator() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    to: "esempio@email.com",
    subject: "Oggetto di esempio",
    body: "Testo dell’email di esempio...",
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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4">Invia Email</h2>

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

        {/* IMMAGINE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Immagine
          </label>
          {imageSrc ? (
            <div className="relative group">
              <img
                src={imageSrc}
                alt="Anteprima"
                className="w-full max-h-64 object-contain rounded-md border border-gray-300 cursor-pointer hover:opacity-80"
                onClick={openPreview}
              />
              {isEditing && (
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Elimina
                </button>
              )}
            </div>
          ) : (
            <p className="text-gray-400 italic">Nessuna immagine selezionata</p>
          )}

          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="mt-2 border border-gray-600 p-4 rounded-lg"
            />
          )}
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

      {/* MODALE DI PREVIEW */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closePreview}
        >
          <div className="relative max-w-3xl w-full p-4">
            <img
              src={imageSrc}
              alt="Preview"
              className="max-h-[80vh] mx-auto rounded shadow-lg"
            />
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 px-3 py-1 rounded text-sm"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailConfigurator;
