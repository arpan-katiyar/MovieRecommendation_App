// function Dropdown({ title, options, func }) {
//   return (
//     <div className="select">
//       <select defaultValue={"0"} onChange={func} name="format" id="format">
//         <option value={"0"} disabled>
//           {title}
//         </option>
//         {options.map((o, i) => (
//           <option key={i} value={o}>
//             {o.toUpperCase()}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default Dropdown;

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function Dropdown({ title, options, func }) {
  const [selected, setSelected] = React.useState("");

  const handleSelect = (value) => {
    setSelected(value);
    // mimic <select onChange>
    func({ target: { value } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selected ? selected.toUpperCase() : title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        {options.map((o, i) => (
          <DropdownMenuItem key={i} onSelect={() => handleSelect(o)}>
            {o.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;

