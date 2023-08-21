# ToolManagement

## Short description:
The app will handle the tools inventory of a Carpentry Company.
The company's main problem is that tools keep disappearing, the owner has no idea who last used them, resulting in great financial loss.
The company needs a tool managment system, where the owner can assign each tool to employees. He should also be able to keep track of the available inventory.

## Tasks:
### Create Different User levels
- Employee user, with permission to see which tools he officially took, permission to see when he took the tools and when he has to bring it back.
- Admin user, with permission to see all employee's inventory and also assign tools to employees and take them back.
  Admin can also add new tools to the inventory. Admin receives automated notification if any tools aren't brought back in time.
  Can mark very expensive tools for autotracking.

### Models
- Employee: Has id, name, salary, taken tools list
- Admin Employee: Has id, name, salary
- Tool: id, type, price
- CompanyInventory: stores how many tools per type the company has

### Service
- New User registration
- User login
- Tools assignment service
- Inventory control service
- Statistics generation
- File Writing

## Optional tasks:
- QR code generation for tools
- QR code reading
