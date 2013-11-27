class ReservationRequestsController < ApplicationController
	include ApplicationHelper

	def index
		reservation_requests = ReservationRequest.all
		if reservation_requests
			render json: reservation_requests, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		reservation_request = ReservationRequest.find_by(id: params[:id])
		if reservation_request
			render json: reservation_request, status: 200
		else
			render json: nil, status: 400
		end
	end

	def create
		@request = ReservationRequest.new(request_params)
		if @request.save
			render json: nil, status: 200
		else
			render json: nil, status: 400
		end
	end

	def available_rooms
		request = ReservationRequest.find(params[:id])
		wanted_characteristics = request.characteristics
		wanted_capacity = request.capacity
		rooms = Room.all
		available_rooms = []
		rooms.each {
			|current_room|
			intersect = (current_room.characteristics & wanted_characteristics)
			current_room_is_acceptable = (intersect == wanted_characteristics)
			if current_room_is_acceptable
				available_rooms.push current_room
			end
		}
		available_rooms.select {
			|current_room|
			current_room.capacity >= wanted_capacity
		}
		render json: available_rooms, status: 200
	end

	private
		def request_params
			return params.require(:reservation_request).permit(:date,
				:teaching_id, :time_slot_id, :capacity, :characteristics)
		end
end
