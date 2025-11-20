import "./luxuryItems.css";

import { luxuryItems } from "./luxuryItems";
import { prettyPrintNumber } from "../lib/prettyPrintNumber";

export function LuxuryItemsStore({boughtItems, currentBalance, onClick}) {
    return (
        <div className="store-buttons luxury-items-store">
            {luxuryItems.map((item, index) => (
                <div className="luxury-item" key={index}>
                    <button
                        key={item.id}
                        disabled={
                            boughtItems.some((b) => b === item.id) ||
                            item.cost > currentBalance
                        }
                        onClick={() => onClick(item)}
                        title={`${item.description} (Cost: ${prettyPrintNumber(item.cost)} kr)`}
                    >
                        {item.name}
                        {boughtItems.some((b) => b === item.id) && (
                            <span style={{ marginLeft: 16 }}>✅</span>
                        )}
                    </button>
                </div>
            ))}
        </div>
    )
}

export function LuxuryItems({ boughtItems }) {
    return (
        <ul className="luxury-items">
            {boughtItems.map((itemId, index) => {
                const item = luxuryItems.find((i) => i.id === itemId);
                return <li key={index} title={item ? getLuxuryItemTitleString(item) : "Unknown Item"}>{item ? item.icon : "?"} </li>;
            })}
        </ul>
    )
}

function getLuxuryItemTitleString(item) {
    return `${item.name}. ${item.description})`;
}