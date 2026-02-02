import React from "react";
import { Link } from "react-router-dom";
// import { NAV_DATA } from "../data/navigationData";

function Dropdown({section, setMenuOpen}) {
    return (
        <ul
            className={
                section.dropdownLayout === "two-column"
                    ? "two-col-dropdown"
                    : "dropdown"
            }
        >
            {/* GROUPED (Design) */}
            {section.grouped &&
                Object.entries(section.subcategories).map(
                    ([groupKey, group]) => (
                        <li key={groupKey} className="dropdown-item">
                            <h3>{group.heading}</h3>
                            <ul className="item-list">
                                {group.items.map((item) => (
                                    <li key={item.key}>
                                        <Link
                                            to={`/design?category=${groupKey}&type=${item.key}`}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )
                )}

            {/* FLAT (Materials / Experts) */}
            {!section.grouped &&
                Object.entries(section.subcategories).map(([key, sub]) => (
                    <li key={key} className="dropdown-item">
                        <Link
                            to={`/${section.label}?category=${key}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {sub.label}
                        </Link>
                    </li>
                ))}
        </ul>
    );
}

export default Dropdown;
