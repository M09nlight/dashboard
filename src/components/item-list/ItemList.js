import { useEffect, useState } from "react";
import Objects from "../../assets/data/objects.json";
import Item from "../item/Item";
import styles from "./ItemList.module.css";
import { v4 as uuid } from "uuid";
import { Button, Upload } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";

export default function ItemList() {
  const [cards] = useState(Objects);

  const [addedElements, setAddedElements] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const saveToJson = (addedElements) => {
    const jsonContent = JSON.stringify(addedElements, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "addedElements.json";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  function addElements(card, x, y) {
    setAddedElements((prevElements) => [
      ...prevElements,
      { id: uuid(), imgSrc: card.imgSrc, coordinates: { x, y } },
    ]);
  }
  function updateElements(id, card, x, y) {
    setAddedElements((prevElements) => {
      const updatedElements = prevElements.map((element) =>
        element.id === id ? { ...element, coordinates: { x, y } } : element
      );
      return updatedElements;
    });
  }

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      try {
        setSelectedImages(info.file.response);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  };
  useEffect(() => {
    addImages();
  }, [selectedImages]);

  const addImages = () => {
    const newElements = selectedImages.map((image) => ({
      id: image.id,
      imgSrc: image.imgSrc,
      coordinates: { x: image.coordinates.x, y: image.coordinates.y },
    }));

    setAddedElements((prevElements) => [...prevElements, ...newElements]);
  };

  const uploadProps = {
    showUploadList: false,
    customRequest: ({ file, onSuccess }) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        onSuccess(result, file);
      };
      reader.readAsText(file);
    },
    onChange: handleFileChange,
  };

  return (
    <div>
      <div className={styles.flex}>
        {cards.map((card) => {
          return (
            <Item
              card={card}
              key={card.imgSrc}
              addedElements={addedElements}
              addElements={addElements}
              updateElements={updateElements}
            />
          );
        })}
      </div>

      {addedElements.map((element) => {
        return (
          <Item
            card={element}
            key={element.id}
            addedElements={addedElements}
            addElements={addElements}
            updateElements={updateElements}
            style={{
              position: "absolute",
              left: element.coordinates.x,
              top: element.coordinates.y,
            }}
            elemId={element.id}
          />
        );
      })}

      <div className={styles.buttons}>
        <Upload {...uploadProps} className={styles.btn}>
          <Button icon={<UploadOutlined />}>Upload objects</Button>
        </Upload>

        {!!addedElements.length && (
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            onClick={() => saveToJson(addedElements)}
          >
            Download
          </Button>
        )}
      </div>
    </div>
  );
}
