class CharacteristicsController < ApplicationController
	def index
		characteristics = Characteristic.all
		if characteristics
			render json: characteristics, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		characteristic = Characteristic.find_by(id: params[:id])
		if characteristic
			render json: characteristic, status: 200
		else
			render json: nil, status: 400
		end
	end
end
