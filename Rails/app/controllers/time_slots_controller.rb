class TimeSlotsController < ApplicationController
	def index
		time_slots = TimeSlot.all
		if time_slots
			render json: time_slots, status: 200
		else
			render json: nil, status: 401
		end
	end

	def show
		time_slot = TimeSlot.find_by(id: params[:id])
		if time_slot
			render json: time_slot, status: 200
		else
			render json: nil, status: 400
		end
	end
end
