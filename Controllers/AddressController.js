// GET all addresses
const getAddresses = async (req, res) => {
  try {
    res.json({ success: true, addresses: req.user.addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADD new address
const addAddress = async (req, res) => {
  try {
    const { fullName, mobile, pincode, street, city, state, isDefault } = req.body;

    if (!fullName || !mobile || !pincode || !street || !city || !state) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // If new address is default, unset others
    if (isDefault) {
      req.user.addresses.forEach((a) => (a.isDefault = false));
    }

    req.user.addresses.push({ fullName, mobile, pincode, street, city, state, isDefault: !!isDefault });
    await req.user.save();

    res.status(201).json({ success: true, addresses: req.user.addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE address
const deleteAddress = async (req, res) => {
  try {
    req.user.addresses = req.user.addresses.filter(
      (a) => a._id.toString() !== req.params.id
    );
    await req.user.save();
    res.json({ success: true, addresses: req.user.addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAddresses, addAddress, deleteAddress };
