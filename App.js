import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const mockCategories = ["Sofas", "Beds", "Tables", "Chairs", "Storage Units"];
const mockInventory = [
  { name: "Leather Sofa", sku: "LS-001", quantity: 5, price: "$499" },
  { name: "Queen Bed", sku: "QB-002", quantity: 3, price: "$799" },
  { name: "Dining Table", sku: "DT-003", quantity: 10, price: "$399" },
];

export default function MatrixFurnitureLogin() {
  const [step, setStep] = useState("initial");
  const [branch, setBranch] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("");

  const handleSelect = (type) => {
    if (type === "Matrix Direct") setStep("select-branch");
    else setStep("warehouse-login");
  };

  const handleBranchSelect = (selectedBranch) => {
    setBranch(selectedBranch);
    setStep("select-role");
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep("login-form");
  };

  const handleLogin = () => {
    if (username && password) {
      setStep("dashboard");
    } else {
      alert("Please enter both username and password.");
    }
  };

  const renderCategories = () => (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">Categories</h4>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        {mockCategories.map((cat, idx) => (
          <li key={idx}>{cat}</li>
        ))}
      </ul>
      <Button className="mt-4" onClick={() => setView("")}>Back to Dashboard</Button>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">Inventory Items</h4>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Item</th>
            <th className="border px-2 py-1">SKU</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Price</th>
          </tr>
        </thead>
        <tbody>
          {mockInventory.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">{item.sku}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="mt-4" onClick={() => setView("")}>Back to Dashboard</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="space-y-6 p-8">
          {step === "initial" && (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-800">Matrix Furniture Group</h2>
              <Button className="w-full mt-4" onClick={() => handleSelect("Matrix Direct")}>Matrix Direct</Button>
              <Button className="w-full" onClick={() => handleSelect("Matrix Warehouse")}>Matrix Warehouse</Button>
            </>
          )}

          {step === "select-branch" && (
            <>
              <h3 className="text-xl font-semibold text-center text-gray-700">Select Branch</h3>
              <Button className="w-full mt-4" onClick={() => handleBranchSelect("CA")}>CA</Button>
              <Button className="w-full" onClick={() => handleBranchSelect("NJ")}>NJ</Button>
              <Button className="w-full" onClick={() => handleBranchSelect("TX")}>TX</Button>
            </>
          )}

          {step === "select-role" && (
            <>
              <h3 className="text-xl font-semibold text-center text-gray-700">Login as</h3>
              <Button className="w-full mt-4" onClick={() => handleRoleSelect("Customer")}>Customer Login</Button>
              <Button className="w-full" onClick={() => handleRoleSelect("Salesman")}>Salesman Login</Button>
            </>
          )}

          {(step === "warehouse-login" || step === "login-form") && (
            <>
              <h3 className="text-xl font-semibold text-center text-gray-700">
                {step === "warehouse-login" ? "Matrix Warehouse Login" : `${role} Login - ${branch}`}
              </h3>
              <Input
                className="mt-4"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                className="mt-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="w-full mt-4" onClick={handleLogin}>Login</Button>
            </>
          )}

          {step === "dashboard" && (
            <>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-1">Welcome to Inventory Dashboard</h3>
              <p className="text-sm text-center text-gray-600">
                {branch && `${role} - ${branch}`} 
                {!branch && "Warehouse Access"}
              </p>
              <div className="mt-6 space-y-3">
                <Button className="w-full" onClick={() => setView("categories")}>View Categories</Button>
                <Button className="w-full" onClick={() => setView("inventory")}>View Inventory</Button>
              </div>
              {view === "categories" && renderCategories()}
              {view === "inventory" && renderInventory()}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
