const Service = require('../models/services.model');

const createService = async (req, res, _next) => {
  try {
    const { body } = req;
    if (!body) throw new Error('Please attach the body');
    const service = new Service(body);

    if (!service) throw new Error('Something went wrong');

    const serviceAdded = await service.save();
    if (!serviceAdded) throw new Error('Unable to create service');

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Service Created',
      service: serviceAdded.id,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const getServices = async (req, res, _next) => {
  try {
    // const { pageNumber, pageSize } = req.query;
    // if ((!pageNumber, !pageSize))
    //throw new Error('Please give the page number and page size');
    const services = await Service.find().populate('products');
    // .skip(pageSize * (pageSize - 1))
    // .limit(pageSize);
    console.log(services);
    if (!services) throw new Error('No service found');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Services Found',
      services,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

const addProduct = async (req, res, _next) => {
  try {
    const { category, subCategory } = req.query;
    const { id } = req.body;
    if (!category || !subCategory || !id)
      throw new Error('Please attach the queries');
    const service = await Service.findOne({
      cateory: category,
    });

    if (!service) throw new Error('No service found');

    service.products.push(id);

    const updatedData = await service.save();
    if (!updatedData) throw new Error('data not updated');

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Product added',
      service,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};

module.exports = {
  createService,
  getServices,
  addProduct,
};
