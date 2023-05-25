package pt.unl.fct.di.smartbathroom.services

import org.springframework.stereotype.Service
import pt.unl.fct.di.smartbathroom.domain.BathroomDAO
import pt.unl.fct.di.smartbathroom.domain.SlotsDAO
import pt.unl.fct.di.smartbathroom.presistence.BathroomRepository
import pt.unl.fct.di.smartbathroom.presistence.SlotRepository

@Service
class BathroomService(val bathrooms: BathroomRepository, val slots: SlotRepository) {

    fun addBathroom(id: Long): BathroomDAO {
        //ver se o id ja existe
        if(bathrooms.existsById(id))
            throw RuntimeException("ja existe este id")

        var sl = mutableListOf<SlotsDAO>()
        var start = 0.0
        var end = 0.50

        var l : Long = id*100+1

        for (i in 0..47) {
            val slot = SlotsDAO(l++, id, start, end, true, "")
            sl.add(slot)
            slots.save(slot)
            start += 0.5
            end += 0.5
        }
        return bathrooms.save(BathroomDAO(id, sl, 14, 0, false, false, 20, false))
    }

    fun deleteBathroom(id:Long){
        if(!bathrooms.existsById(id))
            throw RuntimeException("O id recebido nao existe.")
        bathrooms.deleteById(id)
    }

    fun getOne(id: Long): BathroomDAO {
        if(!bathrooms.existsById(id))
            throw RuntimeException("O id recebido nao existe.")
        return bathrooms.findById(id).orElseThrow()
    }

    fun getAllBathrooms(): Iterable<BathroomDAO> = bathrooms.findAll()

}