import React, { useState, useEffect } from "react";

const Input = ({ onSend, loading, inputRef, disabled, quotedText }) => {
  const [input, setInput] = useState("");
  const [showQuoteContainer, setShowQuoteContainer] = useState(false);

  useEffect(() => {
    if (quotedText) {
      setInput("");
      setShowQuoteContainer(true);
    } else {
      setShowQuoteContainer(false);
    }
  }, [quotedText]);

  const handleSend = () => {
    if (input.trim()) {
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
      onSend(input);
      setInput("");
      setShowQuoteContainer(false); 
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        96
      )}px`;
    }
  }, [input, inputRef]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input">
      {showQuoteContainer && (
        <div className="quote-container d-flex align-items-center justify-content-between">
          <span>"{quotedText}"</span>
          <button
            className="btn-close"
            onClick={() => setShowQuoteContainer(false)}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}
      <div className="d-flex">
        <button className="btn btn-secondary me-2">
          <i className="bi bi-paperclip"></i>
        </button>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
          className="form-control me-2"
          rows="1"
          style={{ resize: "none" }}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <i className="bi bi-send"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default Input;
