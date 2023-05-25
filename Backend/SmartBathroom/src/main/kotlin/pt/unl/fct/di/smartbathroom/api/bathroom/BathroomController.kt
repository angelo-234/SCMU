package pt.unl.fct.di.smartbathroom.api.bathroom

import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.smartbathroom.api.dto.BathroomDTO
import pt.unl.fct.di.smartbathroom.api.dto.SlotDTO
import pt.unl.fct.di.smartbathroom.services.BathroomService
import pt.unl.fct.di.smartbathroom.services.SlotService

@RestController
class BathroomController(val bathrooms: BathroomService, val slots: SlotService) : BathroomAPI {

    override fun addBathroom(id: Long): BathroomDTO {
        return BathroomDTO(bathrooms.addBathroom(id))
    }

    override fun getBathroom(id: Long): BathroomDTO {
        return BathroomDTO(bathrooms.getOne(id))
    }

    override fun getAllBathrooms(): List<BathroomDTO> =
            bathrooms.getAllBathrooms().map { BathroomDTO(it) }

    override fun deleteBatroom(id: Long) {
        bathrooms.deleteBathroom(id)
    }

    override fun getSlots(id: Long): List<SlotDTO> {
        val bathroom = bathrooms.getOne(id)
        return bathroom.slots.toList().map { SlotDTO(it) }
    }

    override fun getFreeSlots(id: Long): List<SlotDTO> {
        val slots = getSlots(id)
        val it = slots.iterator()
        var res = mutableListOf <SlotDTO>()
        while (it.hasNext()){
            val slot = it.next()
            if(slot.avai)
                res.add(slot)
        }
        return res
    }

    override fun getCode(id: Long, sid: Long): String {
        return slots.getSlot(sid).code
    }

    override fun reserveSlot(id: Long, sid: Long) {
        val code = (1..999).random().toString()
        //print(code)
        slots.reserveSlot(sid, code)
    }

    override fun unreserveSlot(id: Long, sid: Long) {
        slots.unreserveSlot(sid)
    }

    /*override fun getOla(): List<SlotDTO> {
        return slots.getAll().map { SlotDTO(it) }
    }*/
}