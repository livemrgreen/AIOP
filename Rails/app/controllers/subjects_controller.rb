class SubjectsController < ApplicationController
	def index
		subjects = Subject.all
		if subjects
			render json: subjects, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		subject = Subject.find_by(id: params[:id])
		if subject
			render json: subject, status: 200
		else
			render json: nil, status: 400
		end
	end
end
