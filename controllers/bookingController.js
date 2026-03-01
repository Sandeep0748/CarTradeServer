import Booking from "../models/Booking.js"
import Car from "../models/Car.js";


// Function to Check Availability of Car for a given Date
const checkAvailability = async (car, pickupDate, returnDate)=>{
    // normalize dates
    // Log for debugging
    try{
        const bookings = await Booking.find({
            car,
            pickupDate: {$lte: returnDate},
            returnDate: {$gte: pickupDate},
        })
        // debug
        console.log(`[checkAvailability] car=${car} pickup=${pickupDate} return=${returnDate} overlapping=${bookings.length}`)
        return bookings.length === 0;
    }catch(err){
        console.log('[checkAvailability] error', err.message)
        throw err
    }
} 

// API to Check Availability of Cars for the given Date and location
export const checkAvailabilityOfCar = async (req, res)=>{
    try {
        const {location, pickupDate, returnDate} = req.body

        // fetch all available cars for the given location
        // note: schema stores `isAvaliable` (misspelled) — use that field here
        const cars = await Car.find({ location, isAvaliable: true })

        // check car availability for the given date range using promise
          const availableCarsPromises = cars.map(async (car)=>{
              const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
              // return normalized response with isAvailable boolean
              return {...car._doc, isAvailable}
          })

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({success: true, availableCars})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to Create Booking
export const createBooking = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {car, pickupDate, returnDate} = req.body;

        console.log(`[createBooking] user=${_id} car=${car} pickup=${pickupDate} return=${returnDate}`)
        // Prevent duplicate booking for same user, car, and overlapping dates
        const existingBooking = await Booking.findOne({
            car,
            user: _id,
            $or: [
                {
                    pickupDate: { $lte: returnDate },
                    returnDate: { $gte: pickupDate }
                }
            ]
        });
        if (existingBooking) {
            return res.json({ success: false, message: "You have already booked this car for the selected dates." });
        }

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)
        if(!isAvailable){
            return res.json({success: false, message: "Car is not available"})
        }

        const carData = await Car.findById(car)

        if(!carData){
            return res.json({success: false, message: 'Car not found'})
        }

        // Calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDays;

        const booking = await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price, status: 'pending'})

        res.json({success: true, message: "Booking Created", booking})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to List User Bookings 
export const getUserBookings = async (req, res)=>{
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({ user: _id }).populate("car").sort({createdAt: -1})
        res.json({success: true, bookings})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to get Owner Bookings

export const getOwnerBookings = async (req, res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({ success: false, message: "Unauthorized" })
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt: -1 })
        res.json({success: true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to change booking status
export const changeBookingStatus = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({ success: false, message: "Unauthorized"})
        }

        booking.status = status;
        await booking.save();

        res.json({ success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}