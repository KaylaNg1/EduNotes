import React, { useEffect, useState } from 'react';
import './AddNote.css';
import {getClasses} from '../Components/Class'

const AddNote = ({ isOpen, onClose }) => {
  async function createNote() {
    const className = document.querySelector("[name=className]").value;
    console.log(className)

    const formData = {
      class: className,
      token: localStorage.getItem('token')
    };

    try {
      const response = await fetch("http://localhost:8001/addClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Request was successful
        console.log("Data inserted successfully");
        getClasses()
        window.location.reload()

      } else {
        // Request failed
        console.error("Error inserting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error accessing endpoint:", error);
    }

    onClose()

  }

  useEffect(() => {
    if (!isOpen) return;

    const animateButton = (e) => {
      e.preventDefault();
      e.target.classList.remove('animate');
      e.target.classList.add('animate');
      setTimeout(() => {
        e.target.classList.remove('animate');
      }, 700);
    };

    const bubblyButtons = document.getElementsByClassName('Button-Animate');

    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton, false);
    }

    return () => {
      for (let i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].removeEventListener('click', animateButton, false);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="AddNote"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="ModalBody"
        style={{
          background: "white",
          height: "50%",
          width: "50%",
          margin: "auto",
          padding: "2%",
          border: "2px solid #000",
          borderRadius: "10px",
          boxShadow: "2px solid black",
        }}
      >
        <button className="Close" onClick={onClose}>x</button>
        <br />
        <h1>Add Note</h1>
        <div className="Element">
          Note Name:
          <br />
          <input name="className" type="text" />
        </div>
        <div className="Buttons">
          <button className="Button-Animate" onClick={createNote}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
