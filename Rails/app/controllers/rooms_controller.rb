class RoomsController < ApplicationController
	def index
		rooms = Room.all
		if rooms
			render json: rooms, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		room = Room.find_by(id: params[:id])
		if room
			render json: room, status: 200
		else
			render json: nil, status: 400
		end
	end
end
