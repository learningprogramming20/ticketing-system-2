const router = require("express").Router();

const Site = require("../../schemas/sites");

// Create a new site
router.post("/", async (req, res) => {
  try {
    const {
      name,
      region,
      classification,
      power_source,
      affected_sites,
      services_offered,
      is_switched_off_at_night,
    } = req.body;

    const newSite = Site({
      name,
      region,
      classification,
      power_source,
      affected_sites,
      services_offered,
      is_switched_off_at_night,
    });

    const savedSite = await newSite.save();
    res.status(201).send(savedSite);
  } catch (error) {
    console.error("Error creating site:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read all sites
router.get("/", async (req, res) => {
  try {
    // const sites = await Site.find();
    const sites = await Site.find().sort({ name: 1 });
    const totalSites = await Site.countDocuments();
    const isActive = await Site.find({ isActive: true });
    const isDecommisioned = await Site.find({ isDecommisioned: true });

    res.json({
      sites,
      totalSites,
      isActive: isActive.length,
      isDecommisioned: isDecommisioned.length,
    });
  } catch (error) {
    console.error("Error fetching sites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read all sites switched off at night
router.get("/switched-off-at-night", async (req, res) => {
  try {
    const switchedOffAtNightSites = await Site.find({
      is_switched_off_at_night: true,
    });

    res.json(switchedOffAtNightSites);
  } catch (error) {
    console.error("Error fetching switched off at night sites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read a single site by ID
router.get("/:id", async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    res.json(site);
  } catch (error) {
    console.error("Error fetching site:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a site by ID
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      region,
      classification,
      power_source,
      affected_sites,
      services_offered,
      is_switched_off_at_night,
      isActive,
      isDecommisioned,
    } = req.body;

    const updatedSite = await Site.findByIdAndUpdate(
      req.params.id,
      {
        name,
        region,
        classification,
        power_source,
        affected_sites,
        services_offered,
        is_switched_off_at_night,
        isActive,
        isDecommisioned,
      },
      { new: true }
    );

    if (!updatedSite) {
      return res.status(404).json({ error: "Site not found" });
    }

    res.send(updatedSite);
  } catch (error) {
    console.error("Error updating site:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a site by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSite = await Site.findByIdAndDelete(req.params.id);
    if (!deletedSite) {
      return res.status(404).json({ error: "Site not found" });
    }
    res.send(deletedSite);
  } catch (error) {
    console.error("Error deleting site:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
