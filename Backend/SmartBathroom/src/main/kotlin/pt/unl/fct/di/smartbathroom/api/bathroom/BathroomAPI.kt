package pt.unl.fct.di.smartbathroom.api.bathroom

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import pt.unl.fct.di.smartbathroom.api.dto.BathroomDTO
import pt.unl.fct.di.smartbathroom.api.dto.SlotDTO

@RequestMapping("/bathroom")
interface BathroomAPI {

    @PostMapping("/{id}")
    fun addBathroom(@PathVariable id: Long): BathroomDTO

    @GetMapping("/{id}")
    fun getBathroom(@PathVariable id: Long): BathroomDTO

    @GetMapping("")
    fun getAllBathrooms(): List<BathroomDTO>

    @DeleteMapping("/{id}")
    fun deleteBatroom(@PathVariable id: Long)

    @GetMapping("/schedule/{id}")
    fun getSlots(@PathVariable id: Long): List<SlotDTO>

    @GetMapping("/free/{id}")
    fun getFreeSlots(@PathVariable id: Long): List<SlotDTO>

    @GetMapping("/code/{sid}")
    fun getCode(@PathVariable id: Long, @PathVariable sid: Long): String

    @PutMapping("/reserve/{id}/{sid}")
    fun reserveSlot(@PathVariable id: Long, @PathVariable sid: Long)

    @PutMapping("/unreserve/{id}/{sid}")
    fun unreserveSlot(@PathVariable id: Long, @PathVariable sid: Long)

    /*@GetMapping("/ola")
    fun getOla(): List<SlotDTO>*/

}