import { useState } from "react";

function AccordionComponent({ children, title }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-component" style={{ width: '100%' }}>
            <div 
                className="accordion-header" 
                onClick={toggle} 
                style={{
                    cursor: 'pointer',
                    backgroundColor: '#f1f1f1',
                    padding: '10px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                }}
            >
                {title}
            </div>
            {isOpen && (
                <div 
                    className="accordion-body" 
                    style={{
                        padding: '10px 15px',
                        border: '1px solid #ddd',
                        borderTop: 'none',
                        borderRadius: '0 0 5px 5px',
                        backgroundColor: '#fff'
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

export default AccordionComponent;
