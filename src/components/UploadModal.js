import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal/Modal";

import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/core/Icon";
// import Stack from "@material-ui/core/";
import { FileDrop } from "react-file-drop";
import { useSelector } from "react-redux";
import CheckboxLabels from "./CheckBoxes";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "5px 5px 5px 5px",
  p: 4,
};

const Input = styled("input")({
  display: "none",
});

const UploadModal = ({ onClose, open }) => {
  const [fileName, setFileName] = useState("Drop some files here!");
  const { caseWorkers } = useSelector((state) => state.caseworker);
  const [isChecked, setIsChecked] = useState();

  const handleSingleCheck = (e) => {
    setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FileDrop
              onFrameDragEnter={(event) =>
                console.log("onFrameDragEnter", event)
              }
              onFrameDragLeave={(event) =>
                console.log("onFrameDragLeave", event)
              }
              onFrameDrop={(event) => console.log("onFrameDrop", event)}
              onDragOver={(event) => console.log("onDragOver", event)}
              onDragLeave={(event) => console.log("onDragLeave", event)}
              onDrop={(files, event) => setFileName(files[0].name)}
            >
              {fileName}
            </FileDrop>

            <label htmlFor="contained-button-file">
              <Input id="contained-button-file" type="button" />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {caseWorkers &&
              caseWorkers.map((worker) => {
                return (
                  <CheckboxLabels
                    label={worker.firstName}
                    key={worker.id}
                    onChange={handleSingleCheck}
                  />
                );
              })}
          </div>
          <label htmlFor="contained-button-file">
            <Input id="contained-button-file" type="button" />
            <Button variant="contained" component="span">
              Share...
            </Button>
          </label>
        </Box>
      </Modal>
    </div>
  );
};
export default UploadModal;
