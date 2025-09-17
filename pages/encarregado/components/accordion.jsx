import { useState } from "react";

function AccordionComponent({ children, title }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${open ? '' : 'collapsed'}`}
            type="button"
            onClick={toggle}
          >
            {title}
          </button>
        </h2>
        <div className={`accordion-collapse collapse ${open ? 'show' : ''}`}>
          <div className="accordion-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccordionComponent;
