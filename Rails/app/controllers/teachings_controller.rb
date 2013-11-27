class TeachingsController < ApplicationController
	def index
		teachings = Teaching.all
		if teachings
			render json: teachings, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		teaching = Teaching.find_by(id: params[:id])
		if teaching
			render json: teaching, status: 200
		else
			render json: nil, status: 400
		end
	end
end
