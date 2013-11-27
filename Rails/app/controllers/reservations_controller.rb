class ReservationsController < ApplicationController
	def index
		reservations = Reservation.all
		if reservations
			render json: reservations, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		reservation = Reservation.find_by(id: params[:id])
		if reservation
			render json: reservation, status: 200
		else
			render json: nil, status: 400
		end
	end

	def create
		@resa = Reservation.new(reservation_params)
		if @resa.save
			render json: nil, status: 200
		else
			render json: nil, status: 400
		end
	end

	private
		def reservation_params
			return params.require(:reservation).permit(:teaching_id,
				:reservation_request_id, :time_slot_id, :room_id)
		end
end
