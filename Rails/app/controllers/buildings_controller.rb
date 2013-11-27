class BuildingsController < ApplicationController
	def index
		buildings = Building.all
		if buildings
			render json: buildings, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		building = Building.find_by(id: params[:id])
		if building
			render json: building, status: 200
		else
			render json: nil, status: 400
		end
	end
end
