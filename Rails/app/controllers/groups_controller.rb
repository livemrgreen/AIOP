class GroupsController < ApplicationController
	def index
		groups = Group.all
		if groups
			render json: groups, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		if group
			render json: group, status: 200
		else
			render json: nil, status: 400
		end
	end

	def reservations
		group = Group.find(params[:id])
		teachings = group.teachings
		reservations = []
		teachings.each {
			|current_teaching|
			reservations.push current_teaching.reservation
		}
		reservations.compact!
		render json: reservations.as_json(include: [:time_slot, :room, 
			{teaching: {include: [:group, :teacher,
				{lesson: {include: [:subject, :lesson_type]}}]}}]),
				root: "reservations", status: 200
	end

	def available_teachings
		group = Group.find(params[:id])
		teachings = group.teachings
		teachings.select! {
			|current_teaching|
			current_teaching.reservation == nil
		}
		render json: teachings.as_json(include: [:group, :teacher,
				{lesson: {include: [:subject, :lesson_type]}}]),
				root: "teachings", status: 200
	end
end
