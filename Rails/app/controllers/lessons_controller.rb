class LessonsController < ApplicationController
	def index
		lessons = Lesson.all
		if lessons
			render json: lessons, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		lesson = Lesson.find_by(id: params[:id])
		if lesson
			render json: lesson, status: 200
		else
			render json: nil, status: 400
		end
	end
end
