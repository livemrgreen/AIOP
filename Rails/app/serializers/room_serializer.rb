class RoomSerializer < ActiveModel::Serializer
  attributes :id, :label, :capacity

  has_one :building
end
