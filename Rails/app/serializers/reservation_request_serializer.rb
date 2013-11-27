class ReservationRequestSerializer < ActiveModel::Serializer
  attributes :id, :date, :teaching_id, :status
end
