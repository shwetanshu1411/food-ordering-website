import foodPartnerModel from "../models/foodpartner.model.js";

export async function getFoodPartnerById(req, res) {
  try {
    const foodPartner = await foodPartnerModel.findById(req.params.id);

    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    res.status(200).json(foodPartner);
  } catch (err) {
    console.error("Error fetching food partner by ID:", err);
    res.status(400).json({ message: "Invalid food partner ID" });
  }
}
