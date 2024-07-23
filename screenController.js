const { createScreen, getScreens, updateScreen, getScreenById } = require('./screen');

const createScreenHandler = async (req, res) => {
  try {
    const { paringCode, screenId, status } = req.body;
    const newScreen = await createScreen(paringCode, screenId, status);
    res.status(201).json(newScreen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScreensHandler = async (req, res) => {
  try {
    const screens = await getScreens();
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScreenByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const screen = await getScreenById(id);
    if (screen) {
      res.status(200).json(screen);
    } else {
      res.status(404).json({ message: 'Screen not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateScreenHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { paringCode, screenId, status } = req.body;
    const updatedScreen = await updateScreen(id, paringCode, screenId, status);
    if (updatedScreen) {
      res.status(200).json(updatedScreen);
    } else {
      res.status(404).json({ message: 'Screen not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createScreenHandler, getScreensHandler, getScreenByIdHandler, updateScreenHandler };
