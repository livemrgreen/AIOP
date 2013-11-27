class LessonTypesController < ApplicationController
	def index
		lesson_types = LessonType.all
		if lesson_types
			render json: lesson_types, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		lesson_type = LessonType.find_by(id: params[:id])
		if lesson_type
			render json: lesson_type, status: 200
		else
			render json: nil, status: 400
		end
	end
end
